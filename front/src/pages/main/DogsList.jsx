import React from 'react';
import { Card } from "antd";
import { NavLink } from "react-router-dom";
import "../styles/DogsList.css";

const { Meta } = Card;

const DogsList = ({ dogs }) => (
    <div className="dogs-span">
        {dogs.map((dog) => (
            <div className="card" key={dog.id}>
                <NavLink to={`/dog/${dog.id}`}>
                    <Card
                        hoverable
                        style={{ maxWidth: 400 }}
                        cover={<img alt="dog" src={dog.imageUrl} />}
                    >
                        <Meta title={dog.breedName} />
                    </Card>
                </NavLink>
            </div>
        ))}
    </div>
);

export default DogsList;