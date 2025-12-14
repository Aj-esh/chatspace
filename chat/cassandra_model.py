import uuid
import os  # add
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model

KEYSPACE = os.getenv("CASSANDRA_KEYSPACE", "chatspace_ks")

class ChatMessage(Model):
    __keyspace__ = KEYSPACE
    __table_name__ = 'messages'

    # Partition by room_addr - all messages in the same room go to the same partition
    room_addr = columns.Text(partition_key=True)

    # Cluster by time (d)escending) to get recent messages first
    timestamp = columns.TimeUUID(primary_key=True, clustering_order="DESC", default=uuid.uuid1)

    username = columns.Text(required=True)
    content = columns.Text(required=True)

class ChatRoom(Model):
    """
    stores audit logs,
        User joined
        User left
    """
    __keyspace__ = KEYSPACE
    __table_name__ = 'rooms'

    room_addr = columns.Text(partition_key=True)
    timestamp = columns.TimeUUID(primary_key=True, clustering_order="DESC", default=uuid.uuid1)

    event_type = columns.Text(required=True)  # 'joined' or 'left'
    username = columns.Text(required=True)