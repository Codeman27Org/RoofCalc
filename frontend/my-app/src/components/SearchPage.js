import React from "react"
import { MDBCol, MDBFormInline, MDBIcon, MDBBtn } from "mdbreact"
import '../styles/SearchPage.css'

const SearchPage = () => {
  return (
    <MDBCol md="6">
      <MDBFormInline className="md-form">
        <MDBIcon icon="search"/>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
      </MDBFormInline>
      <MDBBtn outline color="pink" rounded size="sm" type="submit" className="mr-auto rounded-pill">
        Search
      </MDBBtn>
    </MDBCol>
  );
}

export default SearchPage;
