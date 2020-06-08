import { AnyARecord, AnyRecord } from 'dns';
import { TargetID } from './targetid';

export interface VuforiaTarget {
    id: string;
    target_id: string;
    url: string;
    name: string;
    results: [TargetID];
}
