import axios from 'axios'

export const followAndUnFollow = async (id, userId) => {
    try {
        await axios.put(`/api/user/${id}/follow`, userId)
    } catch (error) {
        console.log(error);
    }

}
