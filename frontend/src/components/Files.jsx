/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, Tree } from "antd";
import axios from "axios";
const { DirectoryTree } = Tree;

const Files = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/files`)
      .then((response) => {
        setTreeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };
  const onExpand = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <div>
      <Card title="Files" extra={<a href="#">Refresh</a>}>
        <DirectoryTree
          multiple
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      </Card>
    </div>
  );
};

export default Files;
