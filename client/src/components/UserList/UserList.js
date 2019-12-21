import React from 'react';
import './UserList.css';
import onlineIcon from '../../icons/onlineIcon.png';
const UserList = ({ users }) => (
    <div className="userList">
        <div>
            <h1>
                Dummy Chatting room.
                  </h1>
        </div>
        {
            users ? (
                <div>
                    People online:
                                    <div className="activeUsers">
                        <h2>
                            {users.map(({ name }) => (
                                <div key={name} className="activeUser">
                                    {name}
                                    <img alt="Online Icon" src="      {onlineIcon}" />

                                </div>
                            ))}

                        </h2>
                        {name}
                    </div>
                </div>
            ) : null
        }
    </div>
)