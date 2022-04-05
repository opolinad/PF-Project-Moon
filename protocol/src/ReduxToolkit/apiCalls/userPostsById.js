import axios from 'axios'
import {
    userPostsStart,
    userPostsSuccess,
    userPostsFailure,
} from '../reducers/usersPosts'

export const allPostById = async (dispatch, id, currentId) => {
    dispatch(userPostsStart())
    try {
        const res = await axios.get(`/api/profile/${id}/${currentId}`)
        dispatch(userPostsSuccess(res.data));
    } catch (error) {
        dispatch(userPostsFailure())
    }
}
