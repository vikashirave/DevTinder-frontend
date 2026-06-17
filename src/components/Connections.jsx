import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import axios from "axios";

function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("Fetched connections:", response.data.data);
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, about, photoUrl } =
          connection;
        return (
          <div key={connection.id} className="flex m-4 p-4 rouneded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img alt="user photo" src={photoUrl} className="w-20 h-20 rouneded-full" />
            </div>
            <div className="text-left mx-4">
              <h2>
                {firstName} {lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>About: {about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Connections;
