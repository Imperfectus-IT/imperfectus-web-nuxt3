// export const useUpdatePersonalData = () => {
//   const { personalData: profileData } = useProfileState();
//   const { update } = useProfileRepository();
//   const { getUser } = useUserRepository();
//   const executeUpdatePersonalData = async (id: number, personalData: PersonalData) => {
//     const { user } = useUserState();
//     await update(id, personalData);
//     profileData.value = personalData;
//     user.value = await getUser()
//   };
//
//   return {
//     personalData: profileData,
//     executeUpdatePersonalData,
//   }
// };

export const useUpdatePersonalData = () => {
  const { updatePersonalData, getUser } = useUserRepository()
  const { user } = useUserState()
  const executeUpdatePersonalData = async (userId: number, data: PersonalData) => {
    await updatePersonalData(userId, data)
    user.value = await getUser()
  }

  return {
    executeUpdatePersonalData,
  }
}
