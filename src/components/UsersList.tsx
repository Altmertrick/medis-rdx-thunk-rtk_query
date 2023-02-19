import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchUsersThC, RootState } from '../store';

type PropsT = {};

const UsersList: React.FC<any> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { usersEntities, isLoading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsersThC());
  }, []);

  const renderedUsers = usersEntities.map((user) => {
    return <div key={user.id}>{user.name}</div>;
  });

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {!renderedUsers.length && <div>Fetch Users</div>}
          <div> {renderedUsers}</div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
