import Book from '../../lib/Book'
import Section from '../../lib/Section'
import Page from '../../lib/Page'
import Story from '../../lib/Story'
import Person from '../../lib/Actor/Person'
import Calculator from './Calculator'

it('tests a calculator', () => {
  const calc = new Calculator()
  calc.send('2 + 2')
  expect(calc.run()).toEqual(4)
})
