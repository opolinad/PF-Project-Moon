import axios from 'axios'
import {
    updateStart,
    updateSuccess,
    updateFailure
} from '../reducers/loginSlice'

//Call to API
export const updateUsers = async (dispatch, id, user, token) => {
    dispatch(updateStart())
    try {
        const res = await axios.put(`http://localhost:3001/api/user/${id}`, user, {
            headers: {
                token
            }
        })
        dispatch(updateSuccess(res.data));
    } catch (error) {
        dispatch(updateFailure())
    }
}
