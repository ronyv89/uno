/**
 * Instances that can be serialized and then
 * materialized again, using a snapshot object,
 * should implement this interface.
 *
 * The method {@link Serializable.createSnapshot} is aimed
 * to serialize the object into a plain JavaScript object (JSON).
 *
 * `Serializable.fromSnapshot` (static) does the oposite operation:
 * transform a simple JSON into an instance of the source class.
 */
export default interface Serializable {
  /**
   * Serialize this instance in a JSON format
   */
  createSnapshot(): Object;
}
