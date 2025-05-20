import '../css/alertComponent.css';

function AlertComponent(props) {
  const color = props.type === 'ok' ? '#40a02b' : '#d20f39';

  return (
    <div style={{ background: color }} className="AlertComponent">
      <label> {props.message}</label>
    </div>
  );
}

export default AlertComponent;
