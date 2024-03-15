/* eslint-disable no-unused-vars */
import styles from './Signin.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';



function Signin() {
    const { signin, user } = useContext(AuthContext);

    const validationSchema = yup.object({
        email: yup.string().required('Il faut préciser votre email').email("L' email n'est pas valide"),
        password: yup.string().required('Il faut préciser votre mot de passe').min(6, 'Au moins 6 caractères'),
    });

    const initialValues = {
        email: '',
        password: ''
    };

    const { handleSubmit, register, formState: { errors, isSubmitting }, setError, clearErrors } = useForm({
        initialValues,
        resolver: yupResolver(validationSchema)
    });

    const submit = handleSubmit(async (credentials)=>{
        try {
            clearErrors();
            await signin(credentials);
        } catch (message) {
            setError('generic', {type: 'generic', message });
        }
    });

    return (
        <>
            { user ? 
                (
                    <Navigate to='/profile'/>
                ):
                (
                    <div className="flex-fill d-flex align-items-center justify-content-center full-height">
                        <form onSubmit={submit} className={`${ styles.form } d-flex flex-column card p-20`} >
                            <h2 className='mb-10'>Connexion</h2>
                            <div className='mb-10 d-flex flex-column'>
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" {...register('email')} />
                                { errors.email && <p className='form-error'>{errors.email.message}</p>}
                            </div>

                            <div className='mb-10 d-flex flex-column'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" {...register('password')} />
                                { errors.password && <p className='form-error'>{errors.password.message}</p>}
                            </div>

                            { errors.generic && <p className='form-error'>{errors.generic.message}</p>}
                            <div className='d-flex justify-content-space-between'>
                                <button disabled={isSubmitting} className='btn btn-primary'>Connexion</button>
                                <NavLink to="../signup" className="btn btn-primary">Creer Utilisateur</NavLink>
                            </div>
                        </form>
                    </div>
                )
            }
        </>

        
    );
}

export default Signin;