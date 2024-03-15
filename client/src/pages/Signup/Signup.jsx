/* eslint-disable no-unused-vars */
import styles from './Signup.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUser } from '../../apis/users';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";


function Signup() {
    const navigate = useNavigate()
    const validationSchema = yup.object({
        name: yup.string().required('Il faut préciser votre nom').min(2, 'Un vrai nom'),
        email: yup.string().required('Il faut préciser votre email').email("L' email n'est pas valide"),
        password: yup.string().required('Il faut préciser votre mot de passe').min(6, 'Au moins 6 caractères'),
    });

    const initialValues = {
        name: '',
        email: '',
        password: ''
    };

    const { handleSubmit, register, formState: { errors, isSubmitting }, setError, clearErrors } = useForm({
        initialValues,
        resolver: yupResolver(validationSchema)
    });

    const submit = handleSubmit(async (user)=>{
        try {
            clearErrors();
            await createUser(user);
            navigate('/signin')
        } catch (message) {
            setError('generic', {type: 'generic', message })
        }
    });

    return (
        <div className="flex-fill d-flex align-items-center justify-content-center full-height">
            <form onSubmit={submit} className={`${ styles.form } d-flex flex-column card p-20`} >
                <h2 className='mb-10'>Inscription</h2>
                <div className='mb-10 d-flex flex-column'>
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" {...register('name')} />
                    { errors.name && <p className='form-error'>{errors.name.message}</p>}
                </div>
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
                    <button disabled={isSubmitting} className='btn btn-primary'>Inscription</button>
                    <NavLink to="../signin" className="btn btn-primary">Deja inscrit ?</NavLink>
                </div>
            </form>
        </div>
    );
}

export default Signup;