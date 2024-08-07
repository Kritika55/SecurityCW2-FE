import React, {useContext, useEffect, useState} from "react";
import {getUserChatsApi} from "../api/api";
import {UserContext} from "../utils/user-context";
import Users from "../components/Users";
import AdminChatBox from "../components/AdminChatBox";

const AdminChat = () => {
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const {user} = useContext(UserContext);

    useEffect(() => {
        const getChats = async () => {
            try {
                const {data} = await getUserChatsApi(user._id);
                setChats(data);
            } catch (e) {
                console.error(e);
            }
        };
        getChats();
    }, [user]);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-100 border-r border-gray-300">
                <div className="p-4">
                    <h1 className="text-lg font-semibold mb-4">Users</h1>
                    <ul>
                        {chats.map((chat) => (
                            <li
                                key={chat._id}
                                className={`py-2 px-4 cursor-pointer hover:bg-gray-200`}
                                onClick={() => setCurrentChat(chat)}
                            >
                                <Users data={chat} currentUser={user._id}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <AdminChatBox
                    chat={currentChat}
                    currentUser={user?._id}
                />
            </div>
        </div>
    );
};

export default AdminChat;