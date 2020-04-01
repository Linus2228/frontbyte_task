import { getSummaryStart } from '../../actions/companyActions'
import { GET_SUMMARY_START } from '../../actions/types'

describe('companyActions', () => {
  test('getSummaryStart', () => {
    const expectedResult = { type: GET_SUMMARY_START }
    expect(getSummaryStart()).toEqual(expectedResult)
  })
})
