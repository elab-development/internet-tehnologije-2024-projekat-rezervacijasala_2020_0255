import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const AddVenue = ({ flag, setFlag }) => {
  const addVenueSchema = yup.object().shape({
    name: yup.string().required('required'),
    description: yup.string().required('required'),
    price: yup.number().required('required').positive('wrong format'),
  });

  const initialValuesAddVeenue = {
    name: '',
    description: '',
    price: '',
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await axios.post('http://localhost:8000/api/venues', {
        name: values.name,
        description: values.description,
        price: values.price,
      });
    } catch (error) {
      console.error(error);
    }

    setFlag(!flag);
    onSubmitProps.resetForm();
  };

  return (
    <div className='visit'>
      <div className='row'>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesAddVeenue}
          validationSchema={addVenueSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className='inputBox'>
                <input
                  type='text'
                  placeholder='Venue name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name='name'
                />
                <span className='errorText'>
                  {errors.name && touched.name && errors.name}
                </span>
              </div>

              <div className='inputBox'>
                <input
                  type='text'
                  placeholder='Description'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name='description'
                />
                <span className='errorText'>
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </span>
              </div>

              <div className='inputBox'>
                <input
                  type='number'
                  placeholder='Price'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name='price'
                />
                <span className='errorText'>
                  {errors.price && touched.price && errors.price}
                </span>
              </div>

              <button type='submit' className='btn'>
                Create
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddVenue;
