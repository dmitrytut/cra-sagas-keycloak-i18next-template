import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ELanguageNs } from '../../common/enums';
import { IAppState } from '../../store/models';
import { ProfileActionCreators } from '../../store/profile/actionCreators';
import { IProfileState } from '../../store/profile/models';
import { ProfileSelectors } from '../../store/profile/selectors';
import { isSuccess } from '../../utils/redux';

/** Profile page. */
const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation([ELanguageNs.PROFILE]);

    const profileBranch = useSelector<IAppState, IProfileState>((state) => ProfileSelectors.root(state));

    useEffect(() => {
        dispatch(ProfileActionCreators.fetch.started());
    }, []);

    return (
        <>
            <div>{t('profilePage.title')}</div>
            <div>
                <button onClick={() => dispatch(ProfileActionCreators.fetch.started())}>{t('profilePage.actions.fetch')}</button>
            </div>
            <div>{t('profilePage.info.title')}:</div>
            {isSuccess(profileBranch) && (
                <>
                    <div>
                        {t('profilePage.info.name')}: {profileBranch.data?.name}
                    </div>
                    <div>
                        {t('profilePage.info.birthDate')}: {profileBranch.data?.birthDate}
                    </div>
                </>
            )}
        </>
    );
};

export default ProfilePage;
