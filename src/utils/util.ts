export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export function logObjectToJson(object:object) {
  console.log(`JSON: ${JSON.stringify(object)}`);
}
