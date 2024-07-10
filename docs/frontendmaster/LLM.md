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

每个toekn embedding 和 embeding 做计算, 给不同的token 不同的权重, 压缩了信息

## transformer

简化、整合模型并进行拟合

## Encoder-Decoder

贪婪搜索：都按概率最大的token进行输出

束搜索：避免按贪婪搜索方式输出只有一种结果，先设定一个k值，在概率从大到小排列的前k个值里，按百分比分配重新随机选择，灵活获取多种输出。因此k越小，结果越固定；k越大，结果越灵活。

核搜索：束搜索的一种变体，设定一个p值，如0.6，在概率从大到小排列的值里，选前n个之和，使和能超过p值

温控搜索：比如有A,B两种token输出的可能，想动态调整A的概率，加入一个参数T，当T<1时，A的概率变大；当T>1时，A的概率变小。就像分子热运动，温度升高，使得运动更剧烈，结果更灵活

chatgpt 解密用的时 核搜索 + 温控搜索

大模型会有一个最小token序列长度，Mask 掩码会为不足最小token长度的序列补全，且补全的部分不参与上下文相关性自注意力计算

