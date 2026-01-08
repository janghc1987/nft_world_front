import { NavLink } from "react-router-dom";

const SecForm = () => {

  return (
    <div className="col-lg-5 col-md-7 mx-auto mb-30">
      <div className="card z-index-0">
        <div className="card-header text-center gray-bg pt-4">
          <h5>Sign in Now</h5>
        </div>
        
        <div className="card-body">
          <form action="post">
            <div className="mb-3 mt-10p"></div>
             
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" aria-label="Email"  />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-check form-check-info text-left">
              <input className="form-check-input" type="checkbox" value=""  checked />
              <label className="form-check-label" >
                Remember Me
              </label>
            </div>
            <div className="text-center">
              <button  className="btn bg-gradient-dark w-100 my-4 mb-2">sign in</button>
            </div>
            <p className="text-sm mt-3 mb-0">Create New account? <NavLink to="/signup"  className="text-dark font-weight-bolder">Sign up</NavLink></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SecForm;