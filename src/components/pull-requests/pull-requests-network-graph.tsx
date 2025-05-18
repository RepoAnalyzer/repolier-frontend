import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { semanticPalette } from 'assets/palette/palette';
import {
    D3DragEvent,
    D3ZoomEvent,
    drag,
    DraggedElementBaseType,
    forceCenter,
    ForceLink,
    forceLink,
    forceManyBody,
    forceSimulation,
    scaleOrdinal,
    schemeCategory10,
    select,
    Selection,
    SimulationLinkDatum,
    SimulationNodeDatum,
    zoom,
    ZoomedElementBaseType,
} from 'd3';
import { styled } from 'styled-components';

type D3Node = SimulationNodeDatum & {
    id: string,
    group: number
};

type D3Link = SimulationLinkDatum<D3Node> & {
    source: string,
    target: string,
    value: number
};

// Not sure about second generic argument (Datum).
type TD3DragEvent = D3DragEvent<DraggedElementBaseType, D3Node, D3Node>;
type TD3ZoomEvent = D3ZoomEvent<ZoomedElementBaseType, D3Node>;

type Graph = {
    nodes: D3Node[],
    links: D3Link[]
};

export type PullRequestsNetworkGraphProps = {
    width: number;
    height: number;
    graph: Graph;
}

const PullRequestsNetworkGraphStyled = styled.div`
    overflow: hidden;
`

const NetworkGraph = styled.svg`
    .links {
        stroke: ${semanticPalette.emphasizing};
    }
`

/* At first link source and target are defined as strings (ids of another vertices) and then in d3 they're transformed
 * into objects with corresponding coordinates and properties to build graph. */
function isVertexObject(vertex: string | D3Node): vertex is D3Node {
    return (vertex as D3Node).x !== undefined;
}

// FIX: Currently duplicates data after dragended. Initial data is destroyed on another dragstart, though.
export const PullRequestsNetworkGraph = (props: PullRequestsNetworkGraphProps) => {
    const ref = useRef<SVGSVGElement>(null)

    const { width, height, graph: { links, nodes } } = props;


    const zoomModule = useCallback((selection: Selection<SVGSVGElement, unknown, null, undefined>) => {
        const handleZoom = (e: TD3ZoomEvent) => {
            selection
                // @ts-expect-error It seems like an error in library typing.
                // According to types `attr` expects array-like structure but it works with
                // `ZoomTransform` class directly just fine.
                .attr('transform', e.transform)
        }

        const zoomBehaviour = zoom()
            .on('zoom', handleZoom);

        // @ts-expect-error FIX: quite hard error, I don't know the reason.
        selection.call(zoomBehaviour)
    }, [])

    useEffect(() => {
        if (!ref.current) {
            return
        }

        const context = select(ref.current);
        const color = scaleOrdinal(schemeCategory10);

        const simulation = forceSimulation<D3Node>()
            .force("link", forceLink<D3Node, D3Link>().id(function (d) {
                return d.id;
            }))
            .force("charge", forceManyBody())
            .force("center", forceCenter(width / 2, height / 2));

        const link = context.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", function (d: D3Link) {
                return Math.sqrt(d.value);
            });

        const node = context.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("r", 5)
            .attr("fill", function (d: D3Node) {
                return color(d.group.toString());
            })
            // @ts-expect-error Not sure how to type it properly.
            // It reports that D3Node is missing some properties that are very similar to
            // D3DragEvent. It seems here we need something more complicated in DragEvent like `D3DragEvent<TD3DragEventBase>`
            // because `dragEvent` has `subject` field that has similar fields. But some are still different
            // like `fx` instead of `dx`.
            .call(drag<SVGSVGElement, TD3DragEvent>()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );

        node.append("title")
            .text(function (d: D3Node) {
                return d.id;
            });

        simulation.nodes(nodes).on("tick", ticked);
        simulation.force<ForceLink<D3Node, D3Link>>("link")?.links(links);

        function dragstarted(dragEvent: TD3DragEvent) {
            if (!dragEvent.active) simulation.alphaTarget(0.3).restart();
            dragEvent.subject.fx = dragEvent.subject.x;
            dragEvent.subject.fy = dragEvent.subject.y;
        }

        function dragged(dragEvent: TD3DragEvent) {
            dragEvent.subject.fx = dragEvent.x;
            dragEvent.subject.fy = dragEvent.y;
        }

        function dragended(dragEvent: TD3DragEvent) {
            if (!dragEvent.active) {
                simulation.alphaTarget(0);
            }
            dragEvent.subject.fx = null;
            dragEvent.subject.fy = null;
        }

        function ticked() {
            link
                .attr("x1", function (d) {
                    if (isVertexObject(d.source)) {
                        return d.source.x ?? null
                    } else {
                        return null
                    }
                })
                .attr("y1", function (d) {
                    if (isVertexObject(d.source)) {
                        return d.source.y ?? null
                    } else {
                        return null
                    }
                })
                .attr("x2", function (d) {
                    if (isVertexObject(d.target)) {
                        return d.target.x ?? null
                    } else {
                        return null
                    }
                })
                .attr("y2", function (d) {
                    if (isVertexObject(d.target)) {
                        return d.target.y ?? null
                    } else {
                        return null
                    }
                });

            node
                .attr("cx", function (d) {
                    return d.x ?? null;
                })
                .attr("cy", function (d) {
                    return d.y ?? null;
                });
        }

        zoomModule(context)

    }, [height, links, nodes, width, zoomModule])

    return (
        <div>
            <PullRequestsNetworkGraphStyled style={{ width, height }}>
                <NetworkGraph className="container" ref={ref} width={width} height={height} />
            </PullRequestsNetworkGraphStyled >
        </div>
    );
}
