// UserList.tsx
import React from "react";
import { Button, Modal, Form, Input as AntInput } from "antd";
import { Person } from "../page";
import { Account } from "../../register/page";
interface UserListProps {
  people: Person[];
  isModalVisible: boolean;
  form: any;
  handleAddButtonClick: () => void;
  handleFormSubmit: (values: any) => void;
  handleModalCancel: () => void;
  handlePersonClick: (person: Person) => void;
  selectedPerson: Person | null;
  accounts: Account[];
}

const UserList: React.FC<UserListProps> = ({
  people,
  isModalVisible,
  form,
  handleAddButtonClick,
  handleFormSubmit,
  handleModalCancel,
  handlePersonClick,
  selectedPerson,
  accounts,
}) => {
  return (
    <div className=" w-1/5 border-r border-gray-300 p-4 overflow-y-auto">
      <div className="text-3xl font-bold mb-4 text-black text-center border-b-4 border-gray-300">
        Chats <span className="text-gray-500">({people.length})</span>{" "}
        <Button
          type="primary"
          shape="circle"
          size="large"
          style={{
            backgroundColor: "black",
            color: "white",
            float: "right",
            marginRight: "16px",
          }}
          onClick={handleAddButtonClick}
        >
          +
        </Button>
      </div>
      {/* Render the people list dynamically */}
      {people.map((person, index) => (
        <div
          key={index}
          className={`flex items-center space-x-4 mb-6 cursor-pointer transition-all duration-300 ${
            selectedPerson === person ? " bg-gray-400" : ""
          } hover:bg-gray-200`}
          
          onClick={() => handlePersonClick(person)}
        >
          <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
            <img
              src={person.imageUrl}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-black text-lg">{person.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
