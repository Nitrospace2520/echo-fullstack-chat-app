import { PropTypes } from "prop-types";
const ChatMessages = ({ messages }) => {
  return <div>{messages}</div>;
};

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default ChatMessages;
