import { RequestHandler } from 'express';
import { User } from '../model/User';

type GetUserParams = { id: string };

interface GetUserRequestHandler extends RequestHandler<GetUserParams> {}

const getUser: GetUserRequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const searchedUser = await User.findById(userId);
    return res.status(200).json({ status: 'success', data: searchedUser });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      error: { message: (e as { message?: string }).message ?? e },
    });
  }
};

export { getUser };
