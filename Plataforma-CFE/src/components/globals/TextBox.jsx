import PropTypes from 'prop-types';

const Textbox = ({ label, name, value, onChange }) => (
    <div>
        <label>{label}</label>
        <input 
            type="text" 
            name={name} 
            value={value} 
            onChange={onChange} 
        />
    </div>
);

Textbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Textbox;
