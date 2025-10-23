import type { FunctionalComponent } from 'preact';
import type { User } from '../types/user';

const UserInfo: FunctionalComponent<User> = ({ name, email }) => {
  return (
    <>
      <strong>{name}</strong> ({email}){' '}
    </>
  );
};

export default UserInfo;