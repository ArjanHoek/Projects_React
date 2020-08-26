export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties }
}

export const updatePurchasable = ingredients =>
  Object.values(ingredients).some(item => item > 0)