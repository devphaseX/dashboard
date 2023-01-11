import { RequestHandler } from 'express';
import { OverAllStat } from '../model/OverAllStat';
import type { ResponseFailure, ResponseSuccess } from './shared.types';
import { ModelData } from '../model';
import { prepareError } from '../util/error';

type GetSalesResponse =
  | ResponseSuccess<ModelData<typeof OverAllStat>>
  | ResponseFailure;

type GetSalesRequestHandler = RequestHandler<null, GetSalesResponse>;

const getSales: GetSalesRequestHandler = async (_, res) => {
  try {
    const [overAllStat] = await OverAllStat.find();
    return res.status(200).json({ status: 'success', data: overAllStat });
  } catch (e) {
    return res.status(400).json({
      status: 'failed',
      error: prepareError(e),
    });
  }
};

export { getSales };
