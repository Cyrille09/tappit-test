import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import axios from 'axios';
import { Input } from '../../components/fields/input';
import { Toggle } from '../../components/fields/toggle';
import { Checkbox } from '../../components/fields/checkbox';
import { Page } from '../../components/page';
import { Button } from '../../components/button';
import { baseURL } from '../../config/config';

function EditPerson() {
  const [person, setPerson] = useState('');
  const match = { params: useParams() };
  let id = `${match.params.id}`;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [match.params.id]);

  function validator(values) {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }

    return errors;
  }

  const initialValues = {
    ...person,
    favouriteSports:
      person &&
      person.favouriteSports.map((details) => ({
        ...details,
      })),
  };

  async function updateRecord(values) {
    const updateData = {
      ...values,
    };
    console.log(updateData);
  }

  async function getData() {
    const result = await axios(
      `${baseURL}/45928af0-9bd1-4eb0-a9a1-55845a009e8d/${id}`
    );
    setPerson(result.data);
  }

  return (
    <Page title={`Edit ${person.firstName} ${person.lastName} Record`}>
      <p className="HeaderTitle">Update person details</p>
      {person && (
        <div>
          <Formik
            form
            initialValues={initialValues}
            validate={validator}
            onSubmit={updateRecord}
            enableReinitialize={true}
          >
            {({ values }) => (
              <Form>
                <div className="row">
                  <div className="col-12 form-group">
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      id="firstName"
                    />
                  </div>
                  <div className="col-12 form-group">
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      id="lastName"
                    />
                  </div>
                  <div className="col-12 form-group">
                    <Toggle
                      type="checkbox"
                      name="isEnabled"
                      id="isEnabled"
                      label="Enabled"
                    />
                  </div>

                  <div className="col-12 form-group">
                    <Toggle
                      type="checkbox"
                      name="isValid"
                      id="isValid"
                      label="Valid"
                    />
                  </div>
                  <div className="col-12 form-group">
                    <Toggle
                      type="checkbox"
                      name="isAuthorised"
                      id="isAuthorised"
                      label="Authorised"
                    />
                  </div>
                  <div className="row">
                    <div className="favoriteSportTitle">
                      <p>Favourite Sports</p>
                    </div>
                    <div className="favoriteSportList">
                      <FieldArray name="favouriteSports">
                        <div role="group" aria-labelledby="answer_map_label">
                          {values.favouriteSports &&
                          values.favouriteSports.length > 0 ? (
                            values.favouriteSports.map((detail, index) => (
                              <div key={index}>
                                <div className="form-group">
                                  <Checkbox
                                    type="checkbox"
                                    name={`favouriteSports.${index}.isEnabled`}
                                    id={`favouriteSports.${index}.isEnabled`}
                                    value={
                                      values.toggle
                                        ? `${detail.name}`
                                        : `${detail.name}`
                                    }
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            <span>Null</span>
                          )}
                        </div>
                      </FieldArray>
                    </div>
                  </div>
                  <div className="col-12 form-group">
                    <div className="row">
                      <div className="col-6">
                        <Button
                          onClick={() => {
                            navigate('/');
                          }}
                          format="danger"
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="col-6 rightAlign">
                        <Button format="success" type="submit">
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Page>
  );
}

export default EditPerson;
