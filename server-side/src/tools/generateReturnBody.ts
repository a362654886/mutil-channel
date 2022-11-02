export type returnBody = {
  statusCode: number;
  headers: Record<string, unknown>;
  body: JSON | string;
};

export const generateReturnBody = (
  status: number,
  body: JSON | string
): returnBody => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: body,
  };
};

export const getResult = async <T, N>(
  body: T,
  asyncFn: (value: T) => Promise<N>,
  successInfo?: string
): Promise<returnBody> => {
  try {
    const aBody: T = body;
    const result = await asyncFn(aBody);
    return generateReturnBody(
      200,
      JSON.stringify(successInfo ? successInfo : result)
    );
  } catch (error: any) {
    return generateReturnBody(400, JSON.stringify(error.toString()));
  }
};
