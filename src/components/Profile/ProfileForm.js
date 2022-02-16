

import classes from './ProfileForm.module.css';


const ProfileForm = () => {


    return(
        <form className={classes.form}>
            <div className={classes.control}>
                <label>Yeni Parola</label>
                <input type='password' id='new-password' minLength="7" />
            </div>
            <div className={classes.action}>
                <button>Şifre Değiştir</button>
            </div>
        </form>
    )

}

export default ProfileForm;