import requestApiProtocol from "../../settings/requestMethod";

export const editUser = async (dispatch, userId, token, data) => {
    //dispatch(editUserStart());
    try {
        const res = await requestApiProtocol.put("/user/" + userId, 
        {
            banned: data,
        },
        {
            headers: {
                token,
            }
        }
        );
        console.log("res", res);
        //dispatch(editUserSuccess(res.data));
    } catch (err) {
        //dispatch(editUserFailure());
    }
};