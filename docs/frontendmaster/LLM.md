# LLM

## embedding

一个句子转换成 N 个 token, 每个 token 用 M 维的张量, 因此转换成 N * M 维张量, 即 token embedding, 用 We 表示; 
token位置影响语义, 因此会有个 position bedding, 用 Wp 表示; 
上下文也会影响语义, 单位矩阵用U表示;
得到等式  embedding(input) = U * We + Wp

大模型有多轮对话的能力, 缓存的多轮对话信息叫 segment embedding, 用 Ws 表示;
embeding = Ws + U * We + Wp

只要取两个token的cos, 即可获得一个相似度, Embedding 建立了自然语言和数学之间的关联关系

## attention