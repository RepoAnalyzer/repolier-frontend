import { D3DragEvent, D3ZoomEvent, DraggedElementBaseType, SimulationLinkDatum, SimulationNodeDatum, ZoomedElementBaseType } from "d3";

export type D3Node = SimulationNodeDatum & {
    id: string,
    group: number
};

export type D3Link = SimulationLinkDatum<D3Node> & {
    source: string,
    target: string,
    value: number
};

// Not sure about second generic argument (Datum).
export type TD3DragEvent = D3DragEvent<DraggedElementBaseType, D3Node, D3Node>;
export type TD3ZoomEvent = D3ZoomEvent<ZoomedElementBaseType, D3Node>;

export type Graph = {
    nodes: D3Node[],
    links: D3Link[]
};

