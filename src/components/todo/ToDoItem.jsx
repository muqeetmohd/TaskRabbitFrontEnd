import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const TodoItem = ({ item, onDelete, onEdit }) => {
  return (
    <ListGroup.Item
      variant="dark"
      action
      style={{ display: "flex", justifyContent: 'space-between' }}
    >
      {item.value}
      <span>
        <Button style={{ marginRight: "10px" }} variant="light" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
        <Button variant="light" onClick={() => onEdit(item.index)}>
          Edit
        </Button>
      </span>
    </ListGroup.Item>
  );
};

export default TodoItem;
