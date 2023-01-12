import { RequestHandler } from 'express';
import { ResponseFailure, ResponseSuccess } from './shared.types';
import { ModelData } from '../model';
import { User } from '../model/User';
import { prepareError } from '../util/error';

type GetAdminResponse =
  | ResponseSuccess<Array<ModelData<typeof User>>>
  | ResponseFailure;

type GetAdminRequestHandler = RequestHandler<null, GetAdminResponse>;

const getAdmin: GetAdminRequestHandler = async (_, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password');
    return res.status(200).json({ status: 'success', data: admins });
  } catch (e) {
    res.status(404).json({ status: 'failed', error: prepareError(e) });
  }
};

export { getAdmin };
