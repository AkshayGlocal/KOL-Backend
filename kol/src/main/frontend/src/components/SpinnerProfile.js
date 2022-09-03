import Spinner from 'react-bootstrap/Spinner';

function SpinnerProfile() {
  
  return (
    <div>
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
    
  );
}

export default SpinnerProfile;