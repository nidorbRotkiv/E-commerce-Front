import UtilityFunctions from '../../lib/utilityFunctions';

test('shouldCapitalize', () => {
  expect(UtilityFunctions.capitalize("test")).toBe("Test");
});
