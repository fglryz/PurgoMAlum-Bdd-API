import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './config.js';

export class PurgoMalumService {
    async filterText(
        text: string,
        format: 'text' | 'json' | 'xml' = 'text',
        blacklist: string = ''
    ): Promise<AxiosResponse<any>> {
        const url = `${BASE_URL}/${format}`;
        const params: any = { text };

        if (blacklist) {
            params.blacklist = blacklist;
        }

        return axios.get(url, { params });
    }

    async filterWithFillText(
        text: string,
        fillText: string,
        format: 'text' | 'json' | 'xml' = 'text'
    ): Promise<AxiosResponse<any>> {
        const url = `${BASE_URL}/${format}`;
        const params: any = { text, fill_text: fillText };

        return axios.get(url, { params });
    }
}

