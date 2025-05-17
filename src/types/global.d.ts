/**
 * Makes specified properties of a type optional while keeping others required.
 *
 * @template T - The original type
 * @template K - Union of property names to make optional (must be keys of T)
 * @returns A new type where the specified properties are optional
 *
 * @example
 * // Basic usage
 * interface User {
 *   id: string;
 *   name: string;
 *   email: string;
 *   age: number;
 * }
 *
 * type PartialUser = PartialBy<User, 'name' | 'age'>;
 *
 * const user1: PartialUser = {
 *   id: '123',
 *   email: 'test@example.com'
 *   // name and age are optional
 * };
 *
 * @example
 * // With nested objects
 * interface Order {
 *   id: string;
 *   items: string[];
 *   shipping: {
 *     address: string;
 *     priority: boolean;
 *   };
 * }
 *
 * type PartialOrder = PartialBy<Order, 'items' | 'shipping'>;
 *
 * const order1: PartialOrder = {
 *   id: 'ord-123',
 *   // items and shipping are optional
 * };
 *
 * const order2: PartialOrder = {
 *   id: 'ord-456',
 *   shipping: {
 *     address: '123 Main St',
 *     // priority is still required in shipping object
 *   }
 * };
 *
 * @example
 * // Combining with other utility types
 * type ReadonlyPartialUser = Readonly<PartialBy<User, 'email'>>;
 *
 * const readonlyUser: ReadonlyPartialUser = {
 *   id: '123',
 *   name: 'Alice',
 *   age: 30
 *   // email is optional
 * };
 * // readonlyUser.id = '456'; // Error - readonly
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
