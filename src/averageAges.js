'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people
    .filter(person => person.sex === 'm'
    && ((century) ? Math.ceil(person.died / 100) === century : true));

  const sumOfAge = men
    .reduce((sum, man) => sum + man.died - man.born, 0);

  return sumOfAge / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.filter(person => person
    .mother !== null).map(el => el.mother);

  const women = people
    .filter(woman => woman.sex === 'f'
      && ((withChildren) ? mothers.includes(woman.name) : true));

  const sumOfAge = women
    .reduce((sum, woman) => sum + woman.died - woman.born, 0);

  return sumOfAge / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people
    .filter(mother => people.some(person => mother.name === person.mother));

  const children = people
    .filter(child => mothers.some(mother => mother.name === child.mother))
    .map(child => {
      const mom = mothers.find(mother => mother.name === child.mother);
      child.motherBorn = mom.born;
      return child;
    })
    .filter(child => (onlyWithSon) ? child.sex === 'm' : true);

  const sumOfAgeDiff = children
    .reduce((sum, child) => sum + child.born - child.motherBorn, 0);

  return sumOfAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
