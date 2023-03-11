import React from 'react';
import { Slider, Button, Collapse } from "antd";
import "../styles/Filters.css";

const { Panel } = Collapse;

export const ranges = {
    "weight": [0, 91],
    "height": [0, 89],
    "age": [0, 20],
    "name": [0, 25]
};

const Filters = ({ filters, onFilterChange, onApplyFilter }) => (
    <Collapse defaultActiveKey={[]} className="filter-panel-collapse">
        <Panel header="Filters" key="panel" showArrow={false}>
            <div className="filter-span">
                <div className="weight filter">
                    <h4>Weight:</h4>
                    <Slider
                        range
                        min={ranges.weight[0]}
                        max={ranges.weight[1]}
                        defaultValue={filters.weight}
                        onChange={(vals) => onFilterChange("weight", vals[0], vals[1])}
                    />
                </div>
                <div className="height filter">
                    <h4>Height:</h4>
                    <Slider
                        range
                        min={ranges.height[0]}
                        max={ranges.height[1]}
                        defaultValue={filters.height}
                        onChange={(vals) => onFilterChange("height", vals[0], vals[1])}
                    />
                </div>
                <div className="age filter">
                    <h4>Age:</h4>
                    <Slider
                        range
                        min={ranges.age[0]}
                        max={ranges.age[1]}
                        defaultValue={filters.age}
                        onChange={(vals) => onFilterChange("age", vals[0], vals[1])}
                    />
                </div>
                <div className="name filter">
                    <h4>Breeds by name:</h4>
                    <Slider
                        range
                        min={ranges.name[0]}
                        max={ranges.name[1]}
                        defaultValue={filters.name}
                        tooltip={{ formatter: (val) => String.fromCharCode('A'.charCodeAt(0) + val) }}
                        onChange={(vals) => onFilterChange("name", vals[0], vals[1])}
                    />
                </div>
                <Button type="primary" onClick={onApplyFilter}>
                    Filter
                </Button>
            </div>
        </Panel>
    </Collapse>
);

export default Filters;