import { AxiosResponse } from "axios";
import Api from "./Api";

export default class ServiceBase<T> {
  resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  getAll = async (): Promise<T[]> => {
    const response: AxiosResponse<T[]> = await Api.get(`/${this.resource}`);
    return response.data;
  };

  getOne = async (id: string): Promise<T> => {
    const response: AxiosResponse<T> = await Api.get(
      `/${this.resource}?id=${id}`
    );
    return response.data;
  };

  getName = async (name: string): Promise<T> => {
    const response: AxiosResponse<T> = await Api.get(
      `/${this.resource}/${name}`
    );
    console.log(response, "endpoint");
    return response.data;
  };

  create = async (item: T): Promise<T> => {
    const response: AxiosResponse<T> = await Api.post(
      `/${this.resource}`,
      item
    );
    return response.data;
  };

  update = async (id: string, item: T): Promise<T> => {
    const response: AxiosResponse<T> = await Api.put(
      `/${this.resource}?id=${id}`,
      item
    );
    return response.data;
  };

  delete = async (id: string): Promise<AxiosResponse<any>> => {
    const response: AxiosResponse<any> = await Api.delete(
      `/${this.resource}?id=${id}`
    );
    return response.data;
  };
}
