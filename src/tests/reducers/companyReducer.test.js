import reducer from '../../reducers/companyReducer'
import { GET_SUMMARY_START } from '../../actions/types'

describe('companyReducer', () => {
  test('should handle GET_SUMMARY_START', () => {
    const initialState = {
      summary: {
        data: {},
        loading: false,
        error: null
      }
    }
    const expetedResult = {
        summary: {
          data: {},
          loading: true,
          error: null
        }
      }
    expect(reducer(initialState, { type: GET_SUMMARY_START })).toEqual(expetedResult)
  })
})
