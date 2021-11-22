
set -e

msg="$1"

if [[ -z $msg ]]; then
  timernow=`date "+%Y-%m-%d %H:%M:%S"`
  msg="dby于 ${timernow} 更新"
fi

git add .
git commit -m "${msg}" 
echo -e "\n=====>>>>>Update msg: ${msg}，分支推送中<<<<<=====\n"

git push origin master
echo -e "\n=====>>>>>当前改动已推送<<<<<=====\n=====>>>>>github actions deploying<<<<<====="