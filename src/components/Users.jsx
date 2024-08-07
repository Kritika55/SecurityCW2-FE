import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../utils/user-context";
import {getUser} from "../api/api";

const Users = ({data, currentUser}) => {
    const [userData, setUserData] = useState(null);
    const senderId = data.members.find((id) => id !== currentUser);

    useEffect(() => {
        const getSenderData = async () => {
            try {
                const response = await getUser(senderId);
                setUserData(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getSenderData();
    }, [senderId]);

    return (
        <>
            <div className="flex items-center gap-4 mb-4">
                <img className="w-10 h-10 rounded-full" src="" alt=""/>
                <div className="font-medium">
                    <div>{userData?.username}</div>
                    <div className="text-sm text-gray-500">Joined in July 2022</div>
                </div>
            </div>
            <hr className="border-gray-300"/>
        </>
    );
};

export default Users;