import React from "react";
import { TreeNode } from "react-organizational-chart";
import OrganigramaSubAreas from "./OrganigramaSubAreas";

const OrganigramaAreas = ({ areas }) => {
  return (
    <>
      {areas.map((area, index) => (
        <TreeNode
          label={<div className="organigrama-node area"> {area.nombre}</div>}
          key={`${area.nombre} ${index}`}
        >
          <OrganigramaSubAreas subareas={area.subareas} />
        </TreeNode>
      ))}
    </>
  );
};

export default OrganigramaAreas;
