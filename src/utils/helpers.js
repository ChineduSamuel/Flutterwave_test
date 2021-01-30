const Response = (error, field_value, condition_value, condition, field) => ({
  error,
  field,
  field_value,
  condition,
  condition_value,
});

function checkCondition(fieldValue, conditionValue, condition, field) {

  switch (condition) {
    case 'eq':
      if (fieldValue === conditionValue) return Response(false, fieldValue, conditionValue, condition, field);
      break;
    case 'neq':
      if (fieldValue !== conditionValue) return Response(false, fieldValue, conditionValue, condition, field);
      break;

    case 'gt':
      if (typeof fieldValue === 'number' && typeof conditionValue === 'number') {
        if ((fieldValue || conditionValue) !== null && (fieldValue > conditionValue)) return Response(false, fieldValue, conditionValue, condition, field);
      }
      if (fieldValue.length > conditionValue.length) return Response(false, fieldValue, conditionValue, condition, field);
      break;

    case 'gte':
      if (typeof fieldValue === 'number' && typeof conditionValue === 'number') {
        if (fieldValue >= conditionValue) return Response(false, fieldValue, conditionValue, condition, field);
      }
      if (fieldValue.length >= conditionValue.length) return Response(false, fieldValue, conditionValue, condition, field);
      break;

    case 'contains':
      if (fieldValue !== null && fieldValue.includes(conditionValue)) return Response(false, fieldValue, conditionValue, condition, field);
      break;

    default:
      return Response(true, fieldValue, conditionValue, condition, field);
  }
  return Response(true, fieldValue, conditionValue, condition, field);
}

module.exports = { checkCondition };
