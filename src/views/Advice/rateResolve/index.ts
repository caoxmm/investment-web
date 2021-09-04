import { RateResolveFactory } from './rateResolveFactory';
import { ETokenType } from './rateResolveToken';
import { IRateResolveTokenizer } from './rateResolveTokenizer';

const str = `
  numMeshes 5
  /**
   * joints 关键字定义谷歌动画的 bindPose
   */
  
   joints {
     "origin" -1 ( 0 0 0 ) ( -0.5 -0.5 -0.5 )
     "Body"   0 (-12.1038131714 0 79.004776001 ) ( -0.5 -0.5 -0.5 )
     //origin
   }
`;
const tokenizer: IRateResolveTokenizer = RateResolveFactory.createRateResolveTokenizer();
tokenizer.setSource(str);
while (tokenizer.moveNext()) {
  if (tokenizer.current.type === ETokenType.NUMBER) {
    console.log('NUMBER: ' + tokenizer.current.getFloat()); // ttt-log
  } else if (tokenizer.current.isString('joints')) {
    console.log('开始解析joints数据'); // ttt-log
  } else {
    console.log(' STRING : ' + tokenizer.current.getString()); // ttt-log
  }
}
