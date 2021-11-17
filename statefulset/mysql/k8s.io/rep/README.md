# Run a Replicated Stateful Application
https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/


```console
kubectl apply -f configMap.yaml -f service.yaml -f statefulset.yaml
```

```console
kubectl get pods -l app=mysql --watch
```

```console
NAME      READY   STATUS    RESTARTS   AGE
mysql-0   2/2     Running   0          2m40s
mysql-1   2/2     Running   0          2m32s
mysql-2   2/2     Running   0          2m22s
```

## Sending client traffic
```console
kubectl run mysql-client --image=mysql:5.7 -i --rm --restart=Never --\
  mysql -h mysql-0.mysql <<EOF
CREATE DATABASE test;
CREATE TABLE test.messages (message VARCHAR(250));
INSERT INTO test.messages VALUES ('hello');
EOF
```

```console
kubectl run mysql-client --image=mysql:5.7 -i -t --rm --restart=Never --\
  mysql -h mysql-read -e "SELECT * FROM test.messages"
```

```console
kubectl run mysql-client-loop --image=mysql:5.7 -i -t --rm --restart=Never --\
  bash -ic "while sleep 1; do mysql -h mysql-read -e 'SELECT @@server_id,NOW()'; done"
```
