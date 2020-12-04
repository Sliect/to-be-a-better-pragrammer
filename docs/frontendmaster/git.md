# git

git merge bugFix    // 在当前分支合并bugFix分支  
git rebase bugFix   // 当前分支master, 基于bugFix合并master分支，HEAD指向不变（即将当前分支master上的记录复制到bugFix上）。创造线性历史  
git checkout xxx    // xxx为节点，控制节点引用的跳转  
git reset xxx       // 本地撤销，并不进行提交  
git revert xxx      // 将撤销作为一个提交记录  
git pull            // fetch 和 merge 的缩写  
git pull --rebase   // git fetch 和 git rebase 的缩写  

cnpm config set registry https://registry.npm.taobao.org 切换淘宝镜像源